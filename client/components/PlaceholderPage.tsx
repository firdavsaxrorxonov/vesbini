import { Construction } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md fade-in">
        <div className="mx-auto h-24 w-24 bg-muted rounded-full flex items-center justify-center">
          <Construction className="h-12 w-12 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Эта страница находится в разработке. Скоро здесь появится новый функционал!
          </p>

          <Link to="/">
            <Button variant="outline" className="w-full">
              Вернуться в каталог
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
