import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const {userId} = await auth();
            console.log("userid", userId)
            if(!userId) {
                return NextResponse.json({isLogin: false}, {status: 200});
            } else {
                return NextResponse.json({isLogin: true}, {status: 200});
            }
        }catch(err){
            console.error(err)
            return NextResponse.json({isLogin: false}, {status: 500});
    }
}