import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe secret key is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Stripe configuration missing. Please set STRIPE_SECRET_KEY in your environment variables.' },
        { status: 500 }
      );
    }

    // Check if base URL is configured
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      console.error('NEXT_PUBLIC_BASE_URL is not configured');
      return NextResponse.json(
        { error: 'Base URL configuration missing. Please set NEXT_PUBLIC_BASE_URL in your environment variables.' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const body = await request.json();
    const { productId, price, productName } = body;

    // Validate required fields
    if (!productId || price === undefined || !productName) {
      console.error('Missing required fields:', { productId, price, productName });
      return NextResponse.json(
        { error: 'Missing required fields: productId, price, and productName are required' },
        { status: 400 }
      );
    }

    // Validate price is a positive number
    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      console.error('Invalid price:', price);
      return NextResponse.json(
        { error: 'Invalid price value' },
        { status: 400 }
      );
    }

    // Ensure base URL doesn't end with a slash
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '');

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: productName,
              description: `Gift Card for Delhi House Café - £${priceNum}`,
            },
            unit_amount: Math.round(priceNum * 100), // Convert to pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/gift-cards`,
      metadata: {
        productId: productId.toString(),
        productName: productName,
        price: priceNum.toString(),
      },
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create checkout session';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    } else if (typeof error === 'object' && error !== null) {
      // Handle Stripe API errors
      const stripeError = error as any;
      if (stripeError.type) {
        errorMessage = `Stripe error: ${stripeError.message || stripeError.type}`;
      }
    }

    // Return error response with more details (safe for client)
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  }
}
