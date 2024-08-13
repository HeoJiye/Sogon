import { NextRequest, NextResponse } from 'next/server';

import { createAccount } from '@/features/auth/api/accountService';
import { authDTOVaildation } from '@/features/auth/model/dto';
import handleGatewayError from '@/shard/lib/handleGatewayError';
import { NotImplementedError } from '@/shard/model/errors/APIErrors';

export async function POST(req: NextRequest) {
  try {
    const authData = authDTOVaildation.parse(await req.json());
    const userRecord = await createAccount(authData);
    return NextResponse.json({ uid: userRecord.uid }, { status: 201 });
  } catch (error) {
    const e = handleGatewayError(error);
    return NextResponse.json({ message: e.message }, { status: e.statusCode });
  }
}

export function DELETE() {
  throw new NotImplementedError();
}
