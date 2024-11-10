import React from 'react';
import { Button } from '@/components/ui/button';
import { Apple, Link } from 'lucide-react';

interface HealthConnectionButtonsProps {
  onAppleWatchConnect?: () => void;
  onNHSConnect?: () => void;
  isAppleWatchConnected?: boolean;
  isNHSConnected?: boolean;
  className?: string;
}

const HealthConnectionButtons: React.FC<HealthConnectionButtonsProps> = ({
  onAppleWatchConnect,
  onNHSConnect,
  isAppleWatchConnected = false,
  isNHSConnected = false,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <Button
        className="group relative overflow-hidden border-0 bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600"
        onClick={onAppleWatchConnect}
      >
        <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="flex items-center gap-2">
          <Apple className="h-5 w-5" />
          <span className="font-medium">
            {!isAppleWatchConnected
              ? 'Apple Watch Connected'
              : 'Connect Apple Watch'}
          </span>
        </div>
      </Button>

      <Button
        className="group relative overflow-hidden border-0 bg-[#005EB8] text-white hover:bg-[#003087]"
        onClick={onNHSConnect}
      >
        <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="flex items-center gap-2">
          <Link className="h-5 w-5" />
          <span className="font-medium">
            {isNHSConnected ? 'NHS Account Connected' : 'Link NHS Account'}
          </span>
        </div>
      </Button>
    </div>
  );
};

export default HealthConnectionButtons;
