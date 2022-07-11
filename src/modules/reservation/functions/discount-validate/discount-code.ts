import axios from "axios";

export class FindDiscountCode {
    static async getCodeAndValidate(discountCode: string) {
      try {
        const { data } = await axios
          .get(
            `${process.env.DISCOUNT_VALIDATE}${discountCode}`
          );
        return data.data;
      } catch (error) {
        console.log(error);
        return error
      }
    }
}