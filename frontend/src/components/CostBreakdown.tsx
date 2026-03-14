import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { DollarSign, MapPin, Clock, Receipt } from 'lucide-react';

interface CostBreakdownProps {
  distance: number;
  time: number;
  totalCost: number;
}

export function CostBreakdown({ distance, time, totalCost }: CostBreakdownProps) {
  // Calculate breakdown based on backend formula: (distance * 100) + (time * 120)
  const baseFare = 50; // Base fare for display
  const distanceCharge = distance * 100;
  const timeCharge = time * 120;

  return (
    <Card className="w-full max-w-md mx-auto shadow-soft animate-fade-in">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
          <Receipt className="w-10 h-10 text-accent" />
        </div>
        <div>
          <CardTitle className="text-2xl font-display">Trip Summary</CardTitle>
          <CardDescription className="mt-2">Your fare breakdown</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Trip Details */}
        <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Distance</span>
            </div>
            <span className="font-semibold">{distance.toFixed(1)} km</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Duration</span>
            </div>
            <span className="font-semibold">{time.toFixed(0)} min</span>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Fare Breakdown
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Base Fare</span>
              <span className="font-medium">${baseFare.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Distance Charge ({distance.toFixed(1)} km × $1.00)
              </span>
              <span className="font-medium">${(distanceCharge / 100).toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Time Charge ({time.toFixed(0)} min × $1.20)
              </span>
              <span className="font-medium">${(timeCharge / 100).toFixed(2)}</span>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="font-display font-bold text-lg">Total Fare</span>
            </div>
            <Badge variant="default" className="text-lg px-4 py-2">
              ${((totalCost + baseFare * 100) / 100).toFixed(2)}
            </Badge>
          </div>
        </div>

        {/* Info Note */}
        <div className="text-xs text-center text-muted-foreground p-3 bg-muted/30 rounded-lg">
          All prices are calculated based on distance traveled and time taken
        </div>
      </CardContent>
    </Card>
  );
}

