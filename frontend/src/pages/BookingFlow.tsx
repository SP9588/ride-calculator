import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Car, ArrowRight, CheckCircle2 } from 'lucide-react';
import { OTPVerificationForm } from '../components/OTPVerificationForm';
import { TripDetailsForm } from '../components/TripDetailsForm';
import { CostBreakdown } from '../components/CostBreakdown';
import { useStartBooking, useCalculateCost } from '../hooks/useQueries';

type BookingStep = 'start' | 'verify' | 'details' | 'summary';

export function BookingFlow() {
  const [step, setStep] = useState<BookingStep>('start');
  const [generatedOTP, setGeneratedOTP] = useState<number | null>(null);
  const [tripData, setTripData] = useState<{ distance: number; time: number } | null>(null);
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);

  const startBookingMutation = useStartBooking();
  const calculateCostMutation = useCalculateCost();

  const handleStartBooking = async () => {
    try {
      const otp = await startBookingMutation.mutateAsync();
      setGeneratedOTP(otp);
      setStep('verify');
    } catch (error) {
      console.error('Failed to start booking:', error);
    }
  };

  const handleVerificationSuccess = () => {
    setStep('details');
  };

  const handleTripDetailsSubmit = async (distance: number, time: number) => {
    try {
      const cost = await calculateCostMutation.mutateAsync({ distance, time });
      setTripData({ distance, time });
      setCalculatedCost(cost);
      setStep('summary');
    } catch (error) {
      console.error('Failed to calculate cost:', error);
    }
  };

  const handleNewBooking = () => {
    setStep('start');
    setGeneratedOTP(null);
    setTripData(null);
    setCalculatedCost(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 md:gap-4">
        {(['start', 'verify', 'details', 'summary'] as const).map((s, idx) => {
          const isActive = step === s;
          const isCompleted =
            (s === 'start' && ['verify', 'details', 'summary'].includes(step)) ||
            (s === 'verify' && ['details', 'summary'].includes(step)) ||
            (s === 'details' && step === 'summary');

          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-glow scale-110'
                    : isCompleted
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
              </div>
              {idx < 3 && (
                <ArrowRight
                  className={`w-4 h-4 md:w-5 md:h-5 ${isCompleted ? 'text-accent' : 'text-muted-foreground'}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      {step === 'start' && (
        <Card className="w-full max-w-md mx-auto shadow-soft animate-fade-in">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <Car className="w-12 h-12 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl font-display">Start Your Journey</CardTitle>
              <CardDescription className="mt-2 text-base">
                Book your ride with secure OTP verification
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-secondary/20 border-secondary">
              <AlertDescription className="text-secondary-foreground">
                <ul className="space-y-1 text-sm">
                  <li>✓ Instant OTP generation</li>
                  <li>✓ Transparent pricing</li>
                  <li>✓ Distance & time-based calculation</li>
                </ul>
              </AlertDescription>
            </Alert>

            <Button
              onClick={handleStartBooking}
              disabled={startBookingMutation.isPending}
              className="w-full"
              size="lg"
            >
              {startBookingMutation.isPending ? 'Generating OTP...' : 'Start Booking'}
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'verify' && generatedOTP !== null && (
        <OTPVerificationForm generatedOTP={generatedOTP} onVerificationSuccess={handleVerificationSuccess} />
      )}

      {step === 'details' && (
        <TripDetailsForm onSubmit={handleTripDetailsSubmit} isLoading={calculateCostMutation.isPending} />
      )}

      {step === 'summary' && tripData && calculatedCost !== null && (
        <div className="space-y-6">
          <CostBreakdown distance={tripData.distance} time={tripData.time} totalCost={calculatedCost} />

          <div className="flex justify-center">
            <Button onClick={handleNewBooking} variant="outline" size="lg">
              Book Another Ride
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

