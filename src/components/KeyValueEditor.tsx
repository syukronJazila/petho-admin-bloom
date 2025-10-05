import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KeyValuePair {
  key: string;
  value: string;
}

interface KeyValueEditorProps {
  label: string;
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
  defaultKeys?: string[];
}

export function KeyValueEditor({ label, value, onChange, defaultKeys = [] }: KeyValueEditorProps) {
  const [pairs, setPairs] = useState<KeyValuePair[]>(() => {
    if (Object.keys(value).length > 0) {
      return Object.entries(value).map(([key, val]) => ({ key, value: val }));
    }
    return defaultKeys.map(key => ({ key, value: '' }));
  });

  const addPair = () => {
    setPairs([...pairs, { key: '', value: '' }]);
  };

  const removePair = (index: number) => {
    const newPairs = pairs.filter((_, i) => i !== index);
    setPairs(newPairs);
    updateValue(newPairs);
  };

  const updatePair = (index: number, field: 'key' | 'value', val: string) => {
    const newPairs = [...pairs];
    newPairs[index][field] = val;
    setPairs(newPairs);
    updateValue(newPairs);
  };

  const updateValue = (newPairs: KeyValuePair[]) => {
    const obj: Record<string, string> = {};
    newPairs.forEach(pair => {
      if (pair.key.trim()) {
        obj[pair.key.trim()] = pair.value;
      }
    });
    onChange(obj);
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <Card>
        <CardContent className="pt-6 space-y-3">
          {pairs.map((pair, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Key (contoh: air)"
                value={pair.key}
                onChange={(e) => updatePair(index, 'key', e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Value (contoh: Jarang)"
                value={pair.value}
                onChange={(e) => updatePair(index, 'value', e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removePair(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addPair}
            className="w-full gap-2"
          >
            <Plus className="h-4 w-4" />
            Tambah Field
          </Button>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">
        {/* PHP: JSON.parse($_POST[field_name]) as object */}
      </p>
    </div>
  );
}
