import { serverApi } from "../../lib/config";
import { Member } from "../../lib/types/member";
import { Product, ProductInquery } from "../../lib/types/product";
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
      console.log(result);

      return result.data;
    } catch (err) {
      console.log("Error, getTopUsers:", err);
      throw err;
    }
  }
}

export default MemberService;
