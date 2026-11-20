import { serverApi } from "../../lib/config";
import { LoginInput, Member, MemberInput } from "../../lib/types/member";
import axios from "axios";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      let url = this.path + "/member/top-users";

      const result = await axios.get(url);

      return result.data;
    } catch (err) {
      console.log("Error, getTopUsers:", err);
      throw err;
    }
  }

  public async getRestaurant(): Promise<Member> {
    try {
      let url = this.path + "/member/restaurant";

      const result = await axios.get(url);

      return result.data;
    } catch (err) {
      console.log("Error, getTopUsers:", err);
      throw err;
    }
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      let url = this.path + "/member/signup";

      const result = await axios.post(url, input, { withCredentials: true });
      localStorage.setItem("memberData", JSON.stringify(result.data.member));

      return result.data.member;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    try {
      let url = this.path + "/member/login";

      const result = await axios.post(url, input, { withCredentials: true });
      localStorage.setItem("memberData", JSON.stringify(result.data.member));

      return result.data.member;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default MemberService;
