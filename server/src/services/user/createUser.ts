import UserModel from "../../models/user";

const createUser = async (req: Request, res: Response) => {
    // see if user with such email already exists
    const userWithGivenEmail = await UserModel.findOne({
        email: (req.body as any).email,
    });
    console.log(userWithGivenEmail);
};
