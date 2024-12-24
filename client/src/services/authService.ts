import http from "./http";
class AuthService {
  baseURI = "auth";
  private getURI(uri: string) {
    return `${this.baseURI}/${uri}`;
  }
  async login(data: object) {
    return await http.post(this.getURI("login"), data);
  }
  async googleLogin(data: object) {
    return await http.post(this.getURI("googleRequest"), data);
  }
  async register(data: object) {
    return await http.post(this.getURI("register"), data);
  }
  async forgotPassword(data: object) {
    return await http.post(this.getURI("forgot-password"), data);
  }
  async resetPassword(data: object) {
    return await http.post(this.getURI("reset-password"), data);
  }
  async verifyEmail(data: object) {
    return await http.post(this.getURI("verify-email"), data);
  }
  async refreshToken(data: object) {
    return await http.post(this.getURI("refresh-token"), data);
  }
  async sendVerificationEmail(data: object) {
    return await http.post(this.getURI("send-verification-email"), data);
  }
}
export default new AuthService();
