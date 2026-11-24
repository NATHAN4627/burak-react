import { serverApi } from "../../lib/config";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../../lib/types/member";
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

  public async logout(): Promise<void> {
    try {
      let url = this.path + "/member/logout";

      await axios.post(url, {}, { withCredentials: true });
      localStorage.removeItem("accessToken");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
      const formData = new FormData();
      formData.append("memberNick", input.memberNick || "");
      formData.append("memberPhone", input.memberPhone || "");
      formData.append("memberAddress", input.memberAddress || "");
      formData.append("memberDesc", input.memberDesc || "");
      formData.append("memberImage", input.memberImage || "");

      const result = await axios(`${serverApi}/member/update`, {
        method: "POST",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("memberData", JSON.stringify(result.data));
      return result.data;
    } catch (err) {
      console.log("Error, updateMember:", err);
      throw err;
    }
  }
}

export default MemberService;
