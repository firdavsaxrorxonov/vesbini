import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const countries = [
  'Uzbekistan',
  'Kazakhstan', 
  'Kyrgyzstan',
  'Tajikistan',
  'Russia'
];

const uzbekistanRegions = [
  'Ташкент',
  'Самарканд',
  'Бухара',
  'Андижан',
  'Наманган',
  'Фергана',
  'Навои',
  'Джизак',
  'Сырдарья',
  'Кашкадарья',
  'Сурхандарья',
  'Хорезм',
  'Каракалпакстан'
];

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProfileModal({
  open,
  onOpenChange
}: EditProfileModalProps) {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    country: user?.country || '',
    region: user?.region || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t.enterName;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t.enterPhone;
    }
    
    if (!formData.country) {
      newErrors.country = t.selectCountry;
    }
    
    if (!formData.region.trim()) {
      newErrors.region = t.selectRegion;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Here you would typically update user data in backend
      // For now, we'll just close the modal
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      country: user?.country || '',
      region: user?.region || ''
    });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[95%] max-h-[95vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-xl font-semibold">{t.editInfo}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-1">
          {/* Form Fields */}
          <div className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="edit-name" className="text-sm font-medium text-foreground">{t.fullName}</Label>
              <Input
                id="edit-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.enterName}
                className="h-12 px-4 rounded-lg border-2 focus:border-primary"
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="edit-phone" className="text-sm font-medium text-foreground">{t.phoneNumber}</Label>
              <Input
                id="edit-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t.enterPhone}
                className="h-12 px-4 rounded-lg border-2 focus:border-primary"
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="edit-country" className="text-sm font-medium text-foreground">{t.country}</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value, region: '' })}
              >
                <SelectTrigger className="h-12 px-4 rounded-lg border-2">
                  <SelectValue placeholder={t.selectCountry} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-sm text-destructive mt-1">{errors.country}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="edit-region" className="text-sm font-medium text-foreground">{t.region}</Label>
              {formData.country === 'Uzbekistan' ? (
                <Select
                  value={formData.region}
                  onValueChange={(value) => setFormData({ ...formData, region: value })}
                >
                  <SelectTrigger className="h-12 px-4 rounded-lg border-2">
                    <SelectValue placeholder={t.selectRegion} />
                  </SelectTrigger>
                  <SelectContent>
                    {uzbekistanRegions.map(region => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="edit-region"
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder={t.enterRegion}
                  className="h-12 px-4 rounded-lg border-2 focus:border-primary"
                />
              )}
              {errors.region && (
                <p className="text-sm text-destructive mt-1">{errors.region}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-border">
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
