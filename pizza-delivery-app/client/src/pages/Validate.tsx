import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";

const Validate = () => {
  const [otpValue, setOtpValue] = useState("");

  const handleSubmit = () => {
    console.log("this is otpValue", otpValue);
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col max-w-2xl p-8 shadow-lg">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-center">Super Pizza</h1>
          <h2>Email Validation</h2>
          <p>
            We Have send you 6 digit OTP code in your Email Address. Please
            Check your email address and Enter the OTP Code in the box
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-8 ">
          <InputOTP
            maxLength={6}
            value={otpValue}
            onChange={(value) => setOtpValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="text-right">
          <Button
            className="bg-orange-500 hover:bg-orange-800"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Validate;
