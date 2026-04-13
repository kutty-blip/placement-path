import { Moon, Palette, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full shadow-sm">
          <Palette className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("light")} className="justify-between">
          <div className="flex items-center">
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </div>
          {(theme === "light" || (theme === "system" && resolvedTheme === "light")) && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="justify-between">
          <div className="flex items-center">
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </div>
          {(theme === "dark" || (theme === "system" && resolvedTheme === "dark")) && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("theme-ocean")} className="justify-between">
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 rounded-full bg-blue-500" />
            <span>Ocean</span>
          </div>
          {theme === "theme-ocean" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("theme-rose")} className="justify-between">
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 rounded-full bg-rose-500" />
            <span>Rose</span>
          </div>
          {theme === "theme-rose" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("theme-emerald")} className="justify-between">
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 rounded-full bg-emerald-500" />
            <span>Emerald</span>
          </div>
          {theme === "theme-emerald" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
