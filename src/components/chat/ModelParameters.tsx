import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

interface ModelParametersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  temperature?: number;
  onTemperatureChange?: (value: number) => void;
  maxTokens?: number;
  onMaxTokensChange?: (value: number) => void;
}

const ModelParameters = ({
  open,
  onOpenChange,
  temperature = 0.7,
  onTemperatureChange = () => {},
  maxTokens = 2048,
  onMaxTokensChange = () => {},
}: ModelParametersProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Model Parameters</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="temperature">Temperature: {temperature}</Label>
            <Slider
              id="temperature"
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={([value]) => onTemperatureChange(value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="maxTokens">Max Tokens: {maxTokens}</Label>
            <Slider
              id="maxTokens"
              min={256}
              max={4096}
              step={256}
              value={[maxTokens]}
              onValueChange={([value]) => onMaxTokensChange(value)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModelParameters;
