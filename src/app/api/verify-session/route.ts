import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET(request: NextRequest) {
  try {
    // Check if Stripe secret key is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe configuration missing' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer'],
    });

    // Extract payment details from session
    const amountTotal = session.amount_total ? session.amount_total / 100 : 0; // Convert from pence to pounds
    const currency = session.currency?.toUpperCase() || 'GBP';
    
    // Get product name from metadata (primary source) or line items
    let productName = session.metadata?.productName || 'Gift Card - Delhi House Café';
    let price = session.metadata?.price ? parseFloat(session.metadata.price) : amountTotal;

    // If we have line items, try to get additional info
    if (session.line_items?.data && session.line_items.data.length > 0) {
      const lineItem = session.line_items.data[0];
      
      // If productName is not in metadata, try to get it from line item description
      if (!session.metadata?.productName && lineItem.description) {
        productName = lineItem.description;
      }
      
      // If price is not in metadata, use the line item amount
      if (!session.metadata?.price && lineItem.amount_total) {
        price = lineItem.amount_total / 100; // Convert from pence to pounds
      }
      
      // If we have a product ID, try to fetch the product name
      if (lineItem.price?.product) {
        try {
          const product = typeof lineItem.price.product === 'string' 
            ? await stripe.products.retrieve(lineItem.price.product)
            : lineItem.price.product;
          if (typeof product !== 'string' && !product.deleted && product.name) {
            productName = product.name;
          }
        } catch (err) {
          // If product retrieval fails, use existing productName
          console.log('Could not retrieve product:', err);
        }
      }
    }

    // Get customer email
    let email = 'customer@example.com';
    if (session.customer_email) {
      email = session.customer_email;
    } else if (session.customer) {
      if (typeof session.customer === 'string') {
        // Customer is a string ID, retrieve it
        const customer = await stripe.customers.retrieve(session.customer);
        if (typeof customer !== 'string' && !customer.deleted && customer.email) {
          email = customer.email;
        }
      } else {
        // Customer is already expanded (object)
        if (!session.customer.deleted && session.customer.email) {
          email = session.customer.email;
        }
      }
    }

    return NextResponse.json({
      success: true,
      amount: price || amountTotal,
      productName: productName,
      email: email,
      currency: currency,
      paymentStatus: session.payment_status,
    });
  } catch (error) {
    console.error('Error verifying session:', error);
    
    let errorMessage = 'Failed to verify session';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  }
}

