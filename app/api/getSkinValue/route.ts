import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const market_hash_name = searchParams.get('skin');

  if (!market_hash_name) {
    return NextResponse.json({ message: 'market hash name is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.dmarket.com/exchange/v1/market/items?title=${market_hash_name}&gameId=a8db&limit=1&currency=USD`)
    if (!response.ok) {
      return NextResponse.json({ message: 'Failed to fetch skin from DMarket' }, { status: response.status });
    }

    const skin = await response.json();
    if (!skin || !skin.objects || skin.objects.length === 0) {
      return NextResponse.json({ value: 0.00 });
    }
    
    const price = ((skin.objects[0].suggestedPrice.USD / 100)).toFixed(2)
    console.log(price)
    return NextResponse.json({ value: price })
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching skin value' }, { status: 500 })
  }
}