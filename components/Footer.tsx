import Link from "next/link";
import { TextLarge, TextSmall, TextSmallMuted } from "./Typography";
import IconButton from "./elements/IconButton";
import IconButtonWrapper from "./elements/IconButtonWrapper";
import { WhatsAppIcon, InstagramIcon, LinkedInIcon } from "./elements/SocialIcons";

export default function Footer() {
  return (
    <footer className="container-site">

        {/* Divider at the top */}
        <div className="w-full h-px gradient-divider-centered mb-24" />

      {/* Row 1: Three columns that stack on small screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div>
          <TextSmall>The<br />Artistic<br />Project</TextSmall>
        </div>
        <div>
          <TextLarge>+34 666666666</TextLarge>
          <TextLarge>info@theartistic-project.com</TextLarge>
        </div>
        <div className="flex w-full items-start justify-end">
          <TextSmall>Experiencias<br />que transforman</TextSmall>
        </div>
      </div>
      {/* Row 2: Three columns that stack on small screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-24 items-end">
        <div>
          {/* Social Media Icon Buttons - using lg size for footer */}
          <IconButtonWrapper size="xl">
            <IconButton
              size="xl"
              href="https://wa.me/34666666666"
              ariaLabel="Contact us on WhatsApp"
            >
              <WhatsAppIcon />
            </IconButton>
            <IconButton
              size="xl"
              href="https://instagram.com/theartisticproject"
              ariaLabel="Follow us on Instagram"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              size="xl"
              href="https://linkedin.com/company/theartisticproject"
              ariaLabel="Connect with us on LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
          </IconButtonWrapper>
        </div>
        <div className="flex items-center gap-2 mt-12 lg:mt-0">
          <TextSmall className="text-[--color-text-secondary]">© {new Date().getFullYear()} The Artistic Project. Todos los derechos reservados.</TextSmall>
        </div>
        <div className="flex items-end justify-end gap-2">
          <TextSmallMuted>website by</TextSmallMuted>
          <TextSmall>
            <Link href="https://misfitcoders.com" target="_blank">MISFITCODERS</Link>
          </TextSmall>
        </div>
      <div style={{ height: "20px" }} />
      </div>
    </footer>
  );
}