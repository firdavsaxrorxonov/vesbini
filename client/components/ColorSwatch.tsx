import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  color: string;
  colorCode: string;
  isSelected: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Color mapping for visual swatches
const colorMap: Record<string, string> = {
  // Russian colors
  'Розовый': '#FF69B4',
  'Голубой': '#87CEEB',
  'Белый': '#FFFFFF',
  'Желтый': '#FFD700',
  'Зеленый': '#32CD32',
  'Синий': '#4169E1',
  'Черный': '#000000',
  'Красный': '#DC143C',
  'Фиолетовый': '#8A2BE2',
  'Серый': '#808080',
  'Коричневый': '#8B4513',
  'Оранжевый': '#FF8C00',
  
  // Uzbek colors  
  'Pushti': '#FF69B4',
  'Moviy': '#87CEEB',
  'Oq': '#FFFFFF',
  'Sariq': '#FFD700',
  'Yashil': '#32CD32',
  'Ko\'k': '#4169E1',
  'Qora': '#000000',
  'Qizil': '#DC143C',
  'Binafsha': '#8A2BE2',
  'Kulrang': '#808080',
  'Jigarrang': '#8B4513',
  'To\'q sariq': '#FF8C00',
  
  // Default colors
  'Pink': '#FF69B4',
  'Blue': '#87CEEB',
  'White': '#FFFFFF',
  'Yellow': '#FFD700',
  'Green': '#32CD32',
  'Navy': '#4169E1',
  'Black': '#000000',
  'Red': '#DC143C',
  'Purple': '#8A2BE2',
  'Gray': '#808080',
  'Brown': '#8B4513',
  'Orange': '#FF8C00'
};

export function ColorSwatch({ 
  color, 
  colorCode, 
  isSelected, 
  onClick,
  size = 'md',
  className 
}: ColorSwatchProps) {
  const swatchColor = colorMap[color] || colorCode || '#CCCCCC';
  const isWhite = swatchColor === '#FFFFFF' || swatchColor.toLowerCase() === '#fff';
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border-2 transition-all duration-200 flex items-center justify-center relative",
        sizeClasses[size],
        isSelected
          ? "border-primary ring-2 ring-primary/30 scale-110"
          : isWhite
            ? "border-border hover:border-primary/50"
            : "border-transparent hover:border-primary/30",
        "hover:scale-105",
        className
      )}
      style={{
        backgroundColor: swatchColor,
        "--swatch-color": swatchColor
      } as React.CSSProperties}
    >
      {/* White border for light colors */}
      {isWhite && (
        <div className="absolute inset-0 rounded-full border border-border/20" />
      )}

      {/* Selection indicator */}
      {isSelected && (
        <div className="w-2 h-2 bg-white rounded-full border border-primary shadow-sm" />
      )}
    </button>
  );
}

interface ColorSelectionProps {
  colors: Array<{ name: string; code?: string }>;
  selectedColor: string;
  onColorSelect: (color: string) => void;
  showNames?: boolean;
  className?: string;
}

export function ColorSelection({ 
  colors, 
  selectedColor, 
  onColorSelect, 
  showNames = true,
  className 
}: ColorSelectionProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Color swatches */}
      <div className="flex gap-2 flex-wrap">
        {colors.map((color) => (
          <div key={color.name} className="flex flex-col items-center gap-1">
            <ColorSwatch
              color={color.name}
              colorCode={color.code || ''}
              isSelected={selectedColor === color.name}
              onClick={() => onColorSelect(color.name)}
              size="md"
            />
            {showNames && (
              <span className={cn(
                "text-xs text-center transition-colors",
                selectedColor === color.name 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground"
              )}>
                {color.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
