// import ky from "ky";

export async function GET(request: Request) {
    const data = await fetch("http://localhost:9000/v1/app", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log("test");
    // console.log(json.json());

    return Response.json("test");
}
