import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log("User signed up", user);
      toast.success(
        "User signed up. Please check your email to verify your account."
      );
    },
  });

  return { signup, isLoading };
}
