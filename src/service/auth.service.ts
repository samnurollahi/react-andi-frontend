import client from "../utils/client";

export default class {
  static async sendOTP(phoneNumber: string) {
    const response = await client.post("/send-otp", {
      phoneNumber,
    });
    return response
  }


  static async verifyOTP(phoneNumber: string, otp: string) {
    const response = await client.post("verify-otp", {
      phoneNumber,
      otp
    })
    return response
  }
}
