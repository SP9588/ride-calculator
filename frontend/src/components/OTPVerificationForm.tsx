import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Shield } from 'lucide-react';
import { useVerifyOTP } from '../hooks/useQueries';

interface OTPVerificationFormProps {
  generatedOTP: number;
  onVerificationSuccess: () => void;
}

export function OTPVerificationForm({ generatedOTP, onVerificationSuccess }: OTPVerificationFormProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const verifyMutation = useVerifyOTP();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter a complete 6-digit OTP');
      return;
    }

    setError(null);
    try {
      const result = await verifyMutation.mutateAsync(parseInt(otp));
      if (result) {
        onVerificationSuccess();
      } else {
        setError('Invalid OTP. Please check and try again.');
        setOtp('');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
      setOtp('');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-soft animate-fade-in">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <img
            src="/assets/generated/otp-icon.dim_128x128.png"
            alt="OTP Verification"
            className="w-16 h-16"
          />
        </div>
        <div>
          <CardTitle className="text-2xl font-display">Verify Your Trip</CardTitle>
          <CardDescription className="mt-2">
            Enter the 6-digit OTP code to confirm your booking
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Display generated OTP for demo purposes */}
        <Alert className="bg-secondary/20 border-secondary">
          <Shield className="h-4 w-4 text-secondary-foreground" />
          <AlertDescription className="text-secondary-foreground">
            <strong>Your OTP:</strong> {generatedOTP.toString().padStart(6, '0')}
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && (
            <Alert variant="destructive" className="animate-fade-in">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {verifyMutation.isSuccess && !error && (
            <Alert className="bg-accent/20 border-accent animate-fade-in">
              <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
              <AlertDescription className="text-accent-foreground">
                OTP verified successfully!
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleVerify}
            disabled={otp.length !== 6 || verifyMutation.isPending}
            className="w-full"
            size="lg"
          >
            {verifyMutation.isPending ? 'Verifying...' : 'Verify OTP'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

