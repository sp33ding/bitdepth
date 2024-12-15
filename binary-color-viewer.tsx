import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Info } from 'lucide-react';

const BinaryColorViewer = () => {
  const [bitDepth, setBitDepth] = useState('4');
  const [channelValue, setChannelValue] = useState(0);
  const [activeChannel, setActiveChannel] = useState('red');

  // Get maximum value for current bit depth
  const getMaxValue = (bits) => Math.pow(2, parseInt(bits)) - 1;

  // Convert decimal to binary string with padding
  const toBinary = (decimal, bits) => {
    return decimal.toString(2).padStart(parseInt(bits), '0');
  };

  // Convert channel value (0 to maxValue) to RGB value (0-255)
  const toRGBValue = (value, bits) => {
    const maxValue = getMaxValue(bits);
    return Math.round((value / maxValue) * 255);
  };

  // Create color object with current channel value
  const getColorObject = () => {
    const rgbValue = toRGBValue(channelValue, bitDepth);
    return {
      red: activeChannel === 'red' ? rgbValue : 0,
      green: activeChannel === 'green' ? rgbValue : 0,
      blue: activeChannel === 'blue' ? rgbValue : 0
    };
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Binary Color Values Explorer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="w-24">Bit Depth:</label>
            <Select 
              value={bitDepth} 
              onValueChange={setBitDepth}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select bit depth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1-bit</SelectItem>
                <SelectItem value="2">2-bit</SelectItem>
                <SelectItem value="4">4-bit</SelectItem>
                <SelectItem value="8">8-bit</SelectItem>
                <SelectItem value="10">10-bit</SelectItem>
                <SelectItem value="12">12-bit</SelectItem>
                <SelectItem value="14">14-bit</SelectItem>
                <SelectItem value="16">16-bit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeChannel} onValueChange={setActiveChannel}>
            <TabsList>
              <TabsTrigger value="red">Red Channel</TabsTrigger>
              <TabsTrigger value="green">Green Channel</TabsTrigger>
              <TabsTrigger value="blue">Blue Channel</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2">
            <label>Value (0-{getMaxValue(bitDepth).toLocaleString()}):</label>
            <Slider
              value={[channelValue]}
              onValueChange={([value]) => setChannelValue(value)}
              min={0}
              max={getMaxValue(bitDepth)}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex space-x-4 items-center">
              <div className="space-y-1">
                <p className="font-semibold">Binary:</p>
                <p className="font-mono text-lg">{toBinary(channelValue, bitDepth)}</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold">Decimal Value:</p>
                <p className="font-mono text-lg">{channelValue.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">RGB Value (0-255)</p>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Info 
                        className="h-4 w-4 text-gray-500 cursor-help" 
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <p>This is a converted color value that can be displayed on standard 8-bit monitors found in most computers and mobile devices. Higher bit depth values are scaled down to fit within the 0-255 range for display purposes.</p>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <p className="font-mono text-lg">{toRGBValue(channelValue, bitDepth)}</p>
              </div>
            </div>

            <div className="flex space-x-4 items-center">
              <p className="font-semibold">Color Preview:</p>
              <div 
                className="w-24 h-24 rounded-lg shadow-inner"
                style={{
                  backgroundColor: `rgb(${getColorObject().red}, ${getColorObject().green}, ${getColorObject().blue})`
                }}
              />
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>Total possible values: {Math.pow(2, parseInt(bitDepth)).toLocaleString()}</p>
            <p>Bits per value: {bitDepth}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BinaryColorViewer;
