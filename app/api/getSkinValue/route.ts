import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const market_hash_name = searchParams.get('skin');

  if (!market_hash_name) {
    return NextResponse.json({ message: 'market hash name is required' }, { status: 400 });
  }

  try {
    const response = await fetch (`https://steamcommunity.com/market/priceoverview/?current=1&appid=730&market_hash_name=${market_hash_name}`)
    const skin = await response.json();

    if (!skin) {
      return NextResponse.json({ message: 'Skin not found' }, { status: 404 });
    }

    return NextResponse.json({ value: skin.lowest_price, volume: skin.volume })
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching skin value' }, { status: 500 })
  }
}