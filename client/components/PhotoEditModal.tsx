import { useState, useRef } from "react";
import { Camera, Upload } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PhotoEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentProfilePhoto: string;
  onProfilePhotoChange: (photo: string) => void;
  userName: string;
}

export function PhotoEditModal({ 
  open, 
  onOpenChange, 
  currentProfilePhoto,
  onProfilePhotoChange,
  userName
}: PhotoEditModalProps) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePhoto, setProfilePhoto] = useState(currentProfilePhoto);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onProfilePhotoChange(profilePhoto);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setProfilePhoto(currentProfilePhoto);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-[95%] max-h-[80vh]">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-xl font-semibold">Rasm o'zgartirish</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center space-y-6 py-4">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
                <AvatarImage src={profilePhoto} alt={userName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                  {userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 h-12 w-12 p-0 rounded-full bg-primary hover:bg-primary/90 shadow-md border-2 border-background"
              >
                <Camera className="h-6 w-6" />
              </Button>
            </div>
            
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-8 py-3 rounded-full"
            >
              <Upload className="h-5 w-5" />
              {t.uploadPhoto}
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 h-12 rounded-lg border-2"
            >
              {t.cancel}
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-12 rounded-lg bg-primary hover:bg-primary/90 font-semibold"
            >
              {t.save}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
