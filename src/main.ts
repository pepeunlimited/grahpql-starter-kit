import { UserServiceClientImpl } from './rpc/user';
import { Rpc, isTwirpError } from 'ts-rpc-client';
async function run() {
  try {
    const client = new UserServiceClientImpl(new Rpc("localhost", 8080));
    const user = await client.CreateUser({ password: "asd", username: "AD", email: "simao@gmail.com" })
    console.log(user)
  } catch (error) {
    if (isTwirpError(error)) {
      console.log(error)
      return
    }
    console.log(error)
  }
}
run();