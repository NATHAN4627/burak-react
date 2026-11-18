import { serverApi } from "../../lib/config";
import { Member } from "../../lib/types/member";
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
}

export default MemberService;
