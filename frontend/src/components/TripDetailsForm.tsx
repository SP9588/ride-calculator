import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Clock, XCircle } from 'lucide-react';

interface TripDetailsFormProps {
  onSubmit: (distance: number, time: number) => void;
  isLoading: boolean;
}

export function TripDetailsForm({ onSubmit, isLoading }: TripDetailsFormProps) {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const distanceNum = parseFloat(distance);
    const timeNum = parseFloat(time);

    if (isNaN(distanceNum) || distanceNum <= 0) {
      setError('Please enter a valid distance greater than 0');
      return;
    }

    if (isNaN(timeNum) || timeNum <= 0) {
      setError('Please enter a valid time greater than 0');
      return;
    }

    onSubmit(distanceNum, timeNum);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-soft animate-fade-in">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <img
            src="/assets/generated/distance-icon.dim_128x128.png"
            alt="Trip Details"
            className="w-16 h-16"
          />
        </div>
        <div>
          <CardTitle className="text-2xl font-display">Trip Details</CardTitle>
          <CardDescription className="mt-2">
            Enter your trip information to calculate the fare
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="distance" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Distance Traveled (km)
              </Label>
              <Input
                id="distance"
                type="number"
                step="0.1"
                min="0"
                placeholder="e.g., 15.5"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Time Taken (minutes)
              </Label>
              <Input
                id="time"
                type="number"
                step="1"
                min="0"
                placeholder="e.g., 30"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="text-lg"
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="animate-fade-in">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={isLoading} className="w-full" size="lg">
            {isLoading ? 'Calculating...' : 'Calculate Fare'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

