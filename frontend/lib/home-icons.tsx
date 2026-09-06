import type { IconType } from "react-icons";
import {
  LiaArrowRightSolid,
  LiaBriefcaseSolid,
  LiaBullseyeSolid,
  LiaChartBar,
  LiaChartLineSolid,
  LiaClock,
  LiaHandshake,
  LiaLayerGroupSolid,
  LiaPencilAltSolid,
  LiaPlaySolid,
  LiaProjectDiagramSolid,
  LiaPuzzlePieceSolid,
  LiaSearchSolid,
  LiaShieldAltSolid,
  LiaUser,
  LiaUsersSolid,
} from "react-icons/lia";
import { CmsImage } from "@/components/ui/CmsImage";

export type HomeIconName =
  | "user"
  | "network"
  | "layers"
  | "trending"
  | "clock"
  | "handshake"
  | "puzzle"
  | "target"
  | "shield"
  | "growth"
  | "briefcase"
  | "users"
  | "chart"
  | "search"
  | "pen"
  | "play"
  | "arrowRight";

export const homeIcons: Record<HomeIconName, IconType> = {
  user: LiaUser,
  network: LiaProjectDiagramSolid,
  layers: LiaLayerGroupSolid,
  trending: LiaChartLineSolid,
  clock: LiaClock,
  handshake: LiaHandshake,
  puzzle: LiaPuzzlePieceSolid,
  target: LiaBullseyeSolid,
  shield: LiaShieldAltSolid,
  growth: LiaChartLineSolid,
  briefcase: LiaBriefcaseSolid,
  users: LiaUsersSolid,
  chart: LiaChartBar,
  search: LiaSearchSolid,
  pen: LiaPencilAltSolid,
  play: LiaPlaySolid,
  arrowRight: LiaArrowRightSolid,
};

interface HomeIconProps {
  name: HomeIconName;
  size?: number;
  className?: string;
}

export function HomeIcon({ name, size = 24, className }: HomeIconProps) {
  const Icon = homeIcons[name] ?? homeIcons.user;
  return <Icon size={size} className={className} aria-hidden />;
}

export function HomeMediaIcon({
  name,
  image,
  alt,
  size = 24,
  className,
}: HomeIconProps & { image?: string; alt?: string }) {
  if (image) {
    return (
      <CmsImage
        src={image}
        alt={alt || ""}
        width={size}
        height={size}
        className={className ?? "size-full object-cover"}
      />
    );
  }
  return <HomeIcon name={name} size={size} className={className} />;
}
