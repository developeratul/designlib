"use client";

import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { BookmarkIcon, SearchIcon, ShapesIcon, UserIcon } from "lucide-react";
import { Card } from "../ui/card";

const featuresList = [
  {
    icon: SearchIcon,
    title: "Browse",
    description: "Browse through a collection of resources to find the ideal tool for you.",
  },
  {
    icon: BookmarkIcon,
    title: "Bookmark",
    description: "Access your resources at lightning speed by bookmarking them.",
  },
  {
    icon: ShapesIcon,
    title: "Share",
    description: "Submit your favorite resources and get them featured.",
  },
  {
    icon: UserIcon,
    title: "Get Featured",
    description: "The resources shared by you, will be attributed to your profile.",
  },
];

export default function Features() {
  return (
    <section className="py-24" id="features">
      <div className="container">
        <div className="space-y-12">
          <div className="space-y-6 w-full max-w-[550px]">
            <h2 className={cn(manrope.className, "text-3xl text-white font-bold")}>
              A <span className="text-primary">community driven</span> platform made to maximize
              your productivity.
            </h2>
            <svg
              className="w-full max-w-md"
              height="3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_322_1065)">
                <path
                  d="M1.7895 1.81394C18.8976 1.64825 36.0477 1.5654 53.1558 1.31249C54.4278 1.29505 56.3147 1.19476 57.0275 0.811037C57.6984 0.449119 56.4545 0.265979 55.4341 0.27034C38.326 0.353189 21.2039 0.601735 4.09574 0.771793C2.82381 0.784875 0.894954 0.893886 0.196092 1.27761C-0.474815 1.63517 0.769159 1.83139 1.80347 1.8183L1.7895 1.81394Z"
                  fill="#D1F225"
                />
                <path
                  d="M68.0831 1.57413C68.0831 1.57413 68.2089 1.57413 68.2648 1.57849L67.6079 1.55669C67.7896 1.56541 67.9573 1.57413 68.139 1.59157L67.5939 1.53488C67.8595 1.56105 68.0971 1.60029 68.3207 1.64825L67.9294 1.56105C68.2788 1.63953 68.5584 1.73546 68.782 1.84884L68.5723 1.73546C68.6422 1.77471 68.6981 1.80523 68.6981 1.8532V1.72238C68.6981 1.77471 68.6702 1.82267 68.6003 1.87064L68.8099 1.73546C68.754 1.77471 68.6702 1.80959 68.5723 1.84448L68.9497 1.71366C68.8798 1.73546 68.796 1.75727 68.7261 1.77907L69.2572 1.65698C69.1314 1.6875 68.768 1.74419 69.3131 1.65698C69.8163 1.57849 69.6206 1.60901 69.4948 1.62645C69.2432 1.65698 70.4313 1.53488 70.0539 1.56541C69.7604 1.59157 71.0323 1.51308 70.5291 1.53488C70.1797 1.55232 71.3398 1.53488 71.0463 1.52616C70.9904 1.52616 70.9345 1.52616 70.8786 1.52616L71.5355 1.54796C71.4097 1.5436 71.2839 1.53488 71.1581 1.5218L71.7032 1.57413C71.5774 1.56105 71.4656 1.5436 71.3538 1.5218L71.7452 1.60465C71.5355 1.56105 71.3818 1.5 71.256 1.43459L71.4656 1.54796C71.2839 1.44767 71.214 1.33866 71.2001 1.22093V1.35174C71.2001 1.22529 71.3119 1.1032 71.4796 0.985464L71.2839 1.12064C71.4097 1.04215 71.5495 0.972383 71.7452 0.911336L71.3678 1.04215C71.4936 1.00291 71.6194 0.968023 71.7591 0.933139L71.228 1.05523C71.3398 1.02907 71.4656 1.00727 71.5914 0.981104C71.843 0.933139 70.9065 1.08139 71.1861 1.04651C71.242 1.03779 71.2979 1.02907 71.3538 1.02471C71.7871 0.968022 70.9065 1.07267 70.9065 1.07267C70.9624 1.06831 71.0323 1.05959 71.0882 1.05523C71.1441 1.05087 71.214 1.04651 71.2699 1.04215C71.2699 1.04215 70.3474 1.09448 70.8087 1.07267C70.9345 1.06831 71.0603 1.05959 71.2001 1.05959C71.4237 1.05523 71.7591 1.06395 70.7947 1.06395C70.8646 1.06395 70.9205 1.06395 70.9904 1.06395C71.2839 1.06395 71.5774 1.06831 71.871 1.07703L71.214 1.05523C71.4936 1.06395 71.7591 1.08139 72.0247 1.10756L71.4796 1.05523C71.6893 1.07703 71.8849 1.1032 72.0666 1.14244L71.6753 1.05959C71.843 1.09884 71.9968 1.14244 72.1086 1.19477L71.8989 1.08139C72.0107 1.14244 72.0666 1.20785 72.0806 1.28198V1.15116C72.0806 1.21657 72.0247 1.27325 71.9408 1.3343L72.1505 1.19913C72.0387 1.26889 71.8849 1.32994 71.7172 1.39099L72.0946 1.26017C71.8989 1.32558 71.6753 1.38663 71.4377 1.43895L71.9688 1.31686C71.871 1.33866 71.7591 1.36046 71.6613 1.38227C71.6194 1.39099 71.5774 1.39535 71.5355 1.40407C71.214 1.46075 72.2483 1.29506 71.9688 1.3343C71.871 1.34738 71.7591 1.36482 71.6613 1.37791C71.6054 1.38663 71.5495 1.39099 71.4796 1.39971C71.214 1.43023 72.4021 1.30814 71.9968 1.34302C71.8849 1.35174 71.7731 1.36046 71.6753 1.36919C71.4097 1.39099 72.6257 1.31686 72.2204 1.3343C72.1785 1.3343 72.1226 1.33866 72.0806 1.34302C72.0247 1.34302 71.9548 1.34302 71.8989 1.34738C71.6473 1.36046 72.7655 1.34302 72.4021 1.33866C72.2903 1.33866 72.1785 1.33866 72.0666 1.3343L72.7236 1.3561C72.5698 1.35174 72.4301 1.34302 72.2903 1.32558L72.8354 1.38227C72.6956 1.36919 72.5838 1.34738 72.458 1.32558L72.8494 1.41279C72.6816 1.37791 72.5558 1.3343 72.444 1.27762L72.6537 1.39099C72.5279 1.32122 72.472 1.25145 72.458 1.17296V1.30378C72.458 1.24273 72.5139 1.18605 72.5838 1.12936L72.3741 1.26453C72.444 1.21657 72.5419 1.17296 72.6537 1.12936L72.2763 1.26017C72.3741 1.22529 72.472 1.19477 72.5978 1.1686L72.0666 1.2907C72.2903 1.24273 72.5279 1.22965 71.7032 1.33866C72.0806 1.28634 70.8926 1.41279 71.214 1.38663C71.3538 1.37355 71.2699 1.37791 70.9345 1.40407C70.641 1.42587 70.3474 1.43459 70.0399 1.43023C70.1238 1.43023 70.2216 1.43023 70.3055 1.43023L69.6486 1.40843C69.7884 1.41279 69.9281 1.42587 70.0679 1.43895L69.5228 1.38227C69.7185 1.40407 69.9002 1.43459 70.0679 1.46948L69.6765 1.38227C70.1378 1.48256 70.4313 1.62209 70.7668 1.75727C71.0603 1.87936 71.8849 1.91424 72.3043 1.91424C72.9472 1.91424 73.5622 1.87936 74.1772 1.81395C74.7083 1.75727 75.3094 1.67878 75.7147 1.55232C76.0641 1.44331 76.3437 1.32994 76.2738 1.1686C76.162 0.893895 75.3653 0.684592 74.6664 0.549418C73.4504 0.318313 71.8151 0.344476 70.4872 0.449127C69.7744 0.505813 69.0056 0.601743 68.3906 0.732557C67.8595 0.845929 67.2864 0.985464 66.951 1.16424C66.5596 1.37791 66.35 1.63953 66.7413 1.87064C66.8951 1.96221 67.0488 2.0407 67.3144 2.1061C67.7617 2.21948 68.181 2.2718 68.7401 2.31977C69.5787 2.38953 70.5851 2.38517 71.4237 2.34157C73.3805 2.24128 75.4352 2.00581 76.8189 1.54796C77.5178 1.31686 78.1747 1.02907 77.9511 0.693313C77.7833 0.449127 77.0425 0.261627 76.3297 0.174418C75.4072 0.0610458 74.4148 0.0174412 73.4224 0.0130807C72.3043 0.00872024 71.1302 0.0479644 70.0679 0.152616C68.8519 0.274709 67.566 0.440406 66.6714 0.736918C66.0704 0.933139 65.5672 1.15988 65.3995 1.43023C65.2737 1.62645 65.3017 1.85756 65.6092 2.03634C65.7769 2.13663 65.9586 2.23692 66.2521 2.30669C66.6994 2.42006 67.1327 2.4811 67.6918 2.52471C69.0615 2.62936 70.6689 2.54215 71.9269 2.36773C73.0171 2.21512 74.1073 1.99273 74.5266 1.62645C74.6524 1.51744 74.6804 1.37791 74.5266 1.27326C74.317 1.14244 74.0654 1.01599 73.702 0.915697C72.7655 0.654069 71.6194 0.553778 70.3894 0.531976C69.6486 0.518895 68.754 0.584302 68.0692 0.675871C67.552 0.745639 66.7832 0.872092 66.4897 1.03779C66.2661 1.15552 66.1263 1.30814 66.4897 1.41715C66.909 1.5436 67.524 1.56977 68.0831 1.57849V1.57413Z"
                  fill="#D1F225"
                />
                <path
                  d="M91.9702 1.97963C106.297 1.8837 120.652 1.8401 134.978 1.6962C136.25 1.68312 138.151 1.57411 138.864 1.19475C139.577 0.81539 138.291 0.654053 137.27 0.654053C122.944 0.697657 108.603 0.837192 94.2765 0.933123C93.0045 0.941843 91.0757 1.05522 90.3768 1.43894C89.678 1.82266 90.9499 1.98836 91.9842 1.97963H91.9702Z"
                  fill="#D1F225"
                />
                <path
                  d="M159.662 1.10757C159.942 1.09012 160.207 1.11629 159.424 1.10757C158.991 1.09012 158.879 1.08576 159.075 1.09448C159.145 1.09448 159.201 1.1032 159.257 1.10757L158.963 1.07704C159.047 1.08576 159.117 1.09884 159.201 1.10757C159.313 1.12501 159.424 1.14681 159.522 1.16861L159.131 1.0814C159.368 1.13809 159.564 1.2035 159.732 1.28634V0.906984C159.536 1.00727 159.327 1.1032 159.089 1.19914C158.977 1.2471 158.851 1.2907 158.739 1.33431C158.586 1.391 158.614 1.37791 158.837 1.29943C158.767 1.32123 158.712 1.34303 158.642 1.36047C158.376 1.44332 158.097 1.52181 157.803 1.59594C157.733 1.61338 157.649 1.63082 157.579 1.64826C157.37 1.69623 157.426 1.68315 157.775 1.60466C157.635 1.62646 157.495 1.66134 157.37 1.68751C157.244 1.71367 157.09 1.73983 156.95 1.766C156.307 1.87937 157.44 1.70059 156.992 1.76163C156.825 1.78344 156.657 1.8096 156.475 1.8314C156.391 1.84448 156.307 1.8532 156.21 1.86193C155.916 1.89681 156.028 1.88373 156.573 1.82268C156.391 1.83576 156.21 1.85757 156.028 1.87065C155.944 1.87937 155.846 1.88373 155.748 1.89245C155.441 1.91425 155.567 1.90553 156.112 1.87065C156.014 1.87501 155.916 1.87937 155.818 1.88373C156.084 1.87065 156.363 1.87065 156.629 1.88809C156.391 1.87065 156.433 1.87937 156.755 1.90553C156.671 1.89681 156.601 1.88373 156.531 1.86629L156.922 1.94913C156.755 1.90989 156.629 1.87065 156.517 1.81396L156.727 1.92733C156.601 1.8532 156.545 1.77908 156.545 1.69623V1.82704C156.545 1.70059 156.671 1.58286 156.825 1.46948L156.629 1.60466C156.769 1.51745 156.936 1.43024 157.132 1.35175C157.174 1.33431 157.244 1.31251 157.286 1.29507C157.02 1.43024 157.034 1.37355 157.188 1.33431C157.244 1.32123 157.314 1.30379 157.356 1.28634C157.537 1.2253 156.839 1.39536 157.118 1.33867C157.3 1.30379 157.468 1.2689 157.635 1.23402C157.719 1.21658 157.817 1.2035 157.901 1.18605C157.985 1.16861 158.334 1.11629 157.901 1.18605C157.468 1.25582 157.831 1.19914 157.915 1.18605C157.999 1.17297 158.11 1.15989 158.194 1.14681C158.446 1.11193 159.215 1.05088 158.222 1.13373C158.418 1.11629 158.614 1.09448 158.823 1.0814C158.921 1.07268 159.019 1.06832 159.131 1.0596C159.55 1.02908 158.837 1.08576 158.795 1.0814C158.921 1.09448 159.271 1.0596 159.41 1.05088C159.508 1.05088 159.62 1.04652 159.718 1.04216C160.109 1.02908 159.508 1.05524 159.438 1.04216C159.578 1.05524 159.816 1.04216 159.955 1.04216C160.053 1.04216 160.473 1.05524 160.011 1.04216C159.592 1.02908 159.914 1.04216 160.011 1.04216C160.095 1.04652 160.179 1.05524 160.263 1.0596C160.515 1.07268 159.858 1.00727 160.081 1.04216C160.249 1.06832 160.417 1.09012 160.584 1.12065L160.193 1.03344C160.431 1.08576 160.626 1.14681 160.78 1.22094L160.57 1.10757C160.682 1.17733 160.738 1.24274 160.752 1.32123V1.19041C160.752 1.27762 160.696 1.35611 160.598 1.43896L160.794 1.30379C160.738 1.33867 160.445 1.46076 160.71 1.36047C161.018 1.25146 161.367 1.21222 161.8 1.15553C162.401 1.09012 162.583 1.06832 162.332 1.0814C161.898 1.10757 162.276 1.09448 163.478 1.03344C162.374 1.03344 160.948 1.13373 160.123 1.38664C159.886 1.4564 159.662 1.53925 159.564 1.63954C159.452 1.76163 159.76 1.91425 160.137 1.9535C161.493 2.08867 162.863 2.04943 164.163 1.86629C165.001 1.74855 165.868 1.56977 166.301 1.30815C166.86 0.96803 166.79 0.579949 165.784 0.327042C164.666 0.0479723 163.142 -0.030516 161.745 -0.0174346C159.9 7.21961e-06 158.124 0.113379 156.405 0.313961C155.022 0.470937 153.498 0.710763 152.436 1.03344C151.639 1.27326 150.856 1.6003 150.703 1.9535C150.535 2.33286 151.08 2.64681 152.24 2.79507C154.169 3.03925 156.405 2.83867 158.278 2.63373C161.088 2.3285 163.687 1.72675 165.239 0.928786C165.518 0.784891 165.518 0.688961 165.239 0.549426C164.288 0.0872165 162.066 -0.0217951 160.473 0.0741351C159.69 0.1221 158.921 0.178786 158.236 0.3096C157.859 0.383728 157.188 0.540705 157.118 0.697682C156.95 1.09448 158.823 1.14245 159.676 1.09448L159.662 1.10757Z"
                  fill="#D1F225"
                />
                <path
                  d="M157.929 1.73111C158.977 1.73111 160.57 1.62646 161.144 1.31686C161.717 1.00727 160.668 0.867737 159.816 0.867737C158.767 0.867737 157.174 0.972388 156.601 1.28198C156.028 1.59157 157.076 1.73111 157.929 1.73111Z"
                  fill="#D1F225"
                />
                <path
                  d="M159.676 1.54794C160.724 1.54794 162.318 1.44329 162.891 1.1337C163.464 0.824105 162.415 0.68457 161.563 0.68457C160.515 0.68457 158.921 0.789221 158.348 1.09881C157.775 1.40841 158.823 1.54794 159.676 1.54794Z"
                  fill="#D1F225"
                />
                <path
                  d="M159.089 1.73111C160.137 1.73111 161.731 1.62646 162.304 1.31686C162.877 1.00727 161.828 0.867737 160.976 0.867737C159.928 0.867737 158.334 0.972388 157.761 1.28198C157.188 1.59157 158.236 1.73111 159.089 1.73111Z"
                  fill="#D1F225"
                />
                <path
                  d="M184.821 2.99999L207.213 2.73836C214.676 2.65115 222.224 2.64679 229.674 2.46365C230.694 2.43749 232.483 2.24999 232.875 1.91423C233.266 1.57848 232.12 1.45202 231.197 1.44766C223.873 1.43022 216.493 1.609 209.169 1.69621L187.127 1.95348C185.855 1.96656 183.94 2.07557 183.228 2.45929C182.571 2.81685 183.787 3.01307 184.835 2.99999H184.821Z"
                  fill="#D1F225"
                />
                <path
                  d="M247.062 2.0189C247.062 2.0189 247.173 2.05815 247.215 2.07995L247.006 1.96658C247.076 2.00582 247.104 2.04071 247.104 2.08431V1.9535C247.104 1.9971 247.062 2.03635 247.006 2.07559L247.215 1.94042C247.145 1.98402 247.062 2.0189 246.964 2.05379L247.341 1.92297C247.341 1.92297 247.215 1.95786 247.145 1.9753C247.607 1.87501 247.733 1.84885 247.523 1.88809C247.285 1.93169 247.453 1.90553 248.012 1.8096C247.746 1.84449 247.942 1.82268 248.599 1.74856C249.298 1.70931 249.508 1.69623 249.214 1.70931C249.605 1.69187 249.997 1.69623 250.374 1.71803C250.332 1.71803 250.29 1.71367 250.248 1.70931L250.794 1.766C250.71 1.75728 250.64 1.74855 250.57 1.73111L250.961 1.81832C250.808 1.78344 250.682 1.74419 250.598 1.69187L250.808 1.80524C250.696 1.73983 250.654 1.67443 250.64 1.6003V1.73111C250.64 1.63954 250.71 1.55233 250.821 1.46949L250.612 1.60466C250.696 1.54797 250.808 1.50001 250.933 1.45204L250.556 1.58286C250.556 1.58286 250.654 1.55233 250.71 1.53489C250.919 1.46949 250.318 1.6221 250.346 1.61774C250.668 1.55233 249.578 1.72675 249.941 1.68315L249.326 1.74856C249.522 1.73111 249.452 1.73547 249.102 1.76164C248.781 1.77908 248.683 1.78344 248.837 1.77908C249.074 1.77036 248.893 1.77036 248.32 1.7878C248.431 1.7878 248.753 1.79652 248.264 1.77908C247.733 1.76164 248.348 1.79216 248.473 1.80524L247.928 1.74856C248.236 1.78344 248.515 1.82704 248.767 1.88373L248.375 1.79652C248.739 1.87937 249.06 1.97966 249.298 2.09739L249.088 1.98402C249.2 2.04507 249.27 2.10175 249.27 2.17152V2.04071C249.27 2.08431 249.242 2.11919 249.186 2.15844L249.396 2.02326C249.354 2.04943 249.312 2.06687 249.256 2.08867L249.633 1.95786C249.633 1.95786 249.536 1.98838 249.494 2.00146C249.899 1.87065 250.053 1.87937 249.801 1.93169C249.494 1.99274 250.514 1.82704 250.234 1.86193C249.829 1.91425 250.78 1.80524 250.752 1.8096C250.668 1.81396 250.598 1.82268 250.514 1.8314C250.109 1.86629 251.423 1.78344 250.989 1.80088C250.835 1.80524 250.234 1.82268 250.877 1.8096C251.52 1.79652 250.933 1.8096 250.78 1.80524C250.626 1.80088 250.472 1.80088 250.318 1.79652C250.039 1.7878 251.031 1.82704 250.682 1.8096C250.598 1.8096 250.514 1.80088 250.43 1.79652C250.262 1.7878 250.109 1.77472 249.955 1.75728L250.5 1.81396C250.304 1.79216 250.109 1.766 249.927 1.73111L250.318 1.81832C250.123 1.77472 249.969 1.72675 249.843 1.66571L250.053 1.77908C249.927 1.70931 249.857 1.63954 249.843 1.56105V1.69187C249.843 1.61338 249.913 1.53925 250.011 1.46949L249.801 1.60466C249.899 1.54797 250.011 1.50001 250.137 1.45204L249.759 1.58286C249.843 1.55669 249.927 1.53489 250.011 1.50873C249.564 1.6439 249.522 1.61774 249.759 1.56978C249.214 1.65262 249.074 1.67443 249.326 1.63954C249.508 1.61774 249.438 1.62646 249.102 1.66135C248.767 1.69623 248.697 1.70495 248.879 1.68751C248.264 1.72239 248.11 1.73111 248.417 1.71803C248.893 1.70059 247.677 1.71803 248.124 1.72675C248.194 1.72675 248.278 1.72675 248.347 1.72675C247.872 1.70931 247.76 1.70495 248.026 1.71803C248.292 1.73547 248.543 1.75292 248.809 1.77908L248.264 1.72239C248.879 1.78344 249.494 1.85757 250.039 1.9753L249.647 1.88809C250.011 1.97094 250.346 2.06251 250.584 2.1846L250.374 2.07123C250.486 2.13664 250.556 2.20204 250.57 2.27617V2.14536C250.57 2.19332 250.528 2.23693 250.472 2.28053L250.682 2.14536C250.626 2.17588 250.57 2.20204 250.5 2.22821L250.877 2.09739C250.877 2.09739 250.78 2.11919 250.766 2.13228L251.171 2.03635L251.702 1.9535C251.339 2.00582 252.541 1.87501 252.205 1.90117C251.87 1.92733 253.086 1.84885 252.764 1.86629C252.303 1.88809 253.561 1.86629 253.086 1.85757C253.03 1.85757 252.974 1.85757 252.918 1.85757C252.89 1.85757 252.862 1.85757 252.834 1.85757C252.625 1.85321 252.778 1.85757 253.281 1.87065C252.778 1.84449 252.275 1.81832 251.786 1.77036L252.331 1.82704C252.024 1.79216 251.73 1.75292 251.45 1.69623L251.842 1.78344C251.632 1.73547 251.45 1.67879 251.311 1.60902L251.52 1.72239C251.409 1.65699 251.353 1.58722 251.353 1.51309V1.6439C251.353 1.56978 251.409 1.50001 251.52 1.43024L251.311 1.56542C251.367 1.53489 251.422 1.50437 251.492 1.47821L251.115 1.60902C251.115 1.60902 251.199 1.58722 251.227 1.57414C251.101 1.61774 250.486 1.72675 250.262 1.75728C250.374 1.74419 249.326 1.85321 249.661 1.82268C249.34 1.85321 249.018 1.86629 248.697 1.87065C248.375 1.87065 248.306 1.87065 248.473 1.87937C249.102 1.89245 249.759 1.84012 250.346 1.77908C250.877 1.72239 251.478 1.6439 251.884 1.51745C252.121 1.44332 252.359 1.36047 252.457 1.25582C252.583 1.12065 252.247 0.981113 251.87 0.933148C250.626 0.776171 249.186 0.832857 247.97 0.994195C247.173 1.09885 246.391 1.25146 245.901 1.47385C245.454 1.67879 245.217 1.98838 245.594 2.21949C246.153 2.55524 247.215 2.69914 248.32 2.79507C249.424 2.891 250.598 2.92152 251.744 2.89972C252.527 2.88228 253.309 2.81251 254.036 2.72094C254.847 2.61629 255.741 2.44187 256.189 2.19332C256.468 2.04071 256.608 1.87501 256.454 1.70059C256.342 1.56542 256.035 1.43024 255.727 1.32559C255.071 1.11193 254.204 0.976753 253.323 0.876462C252.75 0.811055 252.163 0.750008 251.562 0.719485C250.444 0.66716 249.34 0.684601 248.236 0.76309C246.81 0.867741 245.273 1.11629 244.434 1.50437C244.182 1.6221 243.973 1.766 243.931 1.90553C243.889 2.10611 244.015 2.25001 244.392 2.41571C244.937 2.65553 246.013 2.7689 246.894 2.81687C247.956 2.87355 249.116 2.891 250.193 2.83867C251.646 2.76454 253.254 2.62501 254.344 2.29361C254.735 2.17588 255.14 2.02326 255.196 1.84449C255.266 1.63518 255.043 1.48257 254.637 1.31687C252.806 0.57559 248.921 0.627915 246.614 1.10321C245.692 1.29071 244.769 1.59158 244.713 1.95786C244.685 2.15844 244.769 2.28053 245.119 2.44623C245.468 2.61193 246.097 2.69042 246.67 2.73402C247.844 2.81687 249.158 2.73402 250.248 2.59449C251.101 2.48547 251.814 2.3285 252.415 2.11047C253.016 1.89245 253.24 1.54361 252.513 1.31687C252.107 1.19478 251.45 1.15989 250.919 1.15553C250.165 1.14681 249.284 1.2035 248.599 1.29943C248.026 1.37792 247.341 1.48693 247.02 1.66135C246.796 1.78344 246.656 1.92733 247.02 2.04071L247.062 2.0189Z"
                  fill="#D1F225"
                />
                <path
                  d="M272.864 1.61335C288.756 1.72236 304.62 1.98835 320.456 2.37207C321.672 2.4026 323.643 2.22818 324.286 1.87934C324.985 1.50434 323.685 1.37353 322.706 1.34736C306.884 0.924397 291.02 0.680211 275.156 0.566839C273.898 0.558118 271.941 0.702014 271.256 1.07265C270.571 1.44329 271.843 1.60899 272.864 1.61335Z"
                  fill="#D1F225"
                />
                <path
                  d="M339.842 1.21659C339.745 1.29944 339.633 1.37793 339.507 1.45642L339.717 1.32124C339.507 1.45206 339.283 1.58287 338.976 1.69188L339.353 1.56107C339.227 1.60467 339.088 1.64392 338.948 1.6788L339.479 1.55671C339.479 1.55671 339.353 1.58287 339.283 1.59595C339.046 1.63956 339.2 1.61339 339.731 1.52618C339.549 1.54799 339.633 1.54362 339.968 1.50438C340.318 1.46514 340.667 1.43897 341.17 1.43025C341.771 1.42153 341.408 1.43025 341.254 1.42153L341.911 1.44333C341.785 1.43897 341.673 1.43025 341.562 1.42153L342.093 1.47386C341.911 1.45642 341.743 1.43025 341.59 1.39537L341.981 1.47822C341.799 1.43461 341.646 1.38665 341.534 1.3256L341.743 1.43897C341.66 1.39101 341.618 1.34304 341.604 1.29072V1.42153C341.604 1.37357 341.646 1.32996 341.701 1.28636L341.506 1.42153C341.548 1.39537 341.604 1.37357 341.66 1.35176L341.282 1.48258C341.366 1.45642 341.45 1.43025 341.548 1.40845L341.017 1.53054C341.114 1.50874 341.226 1.4913 341.324 1.4695C341.352 1.46514 340.583 1.57851 340.905 1.5349C340.961 1.52618 341.017 1.51746 341.072 1.5131C341.128 1.50874 341.184 1.50002 341.24 1.4913C341.59 1.44769 340.681 1.54799 340.737 1.54362C340.877 1.5349 341.003 1.52182 341.142 1.50874C341.45 1.48258 340.304 1.55671 340.625 1.53926C340.681 1.53926 340.751 1.5349 340.807 1.53054C340.947 1.52618 341.436 1.5131 340.849 1.52618C340.262 1.53926 340.751 1.52618 340.891 1.52618C341.031 1.52618 341.17 1.52618 341.31 1.5349L340.653 1.5131C341.017 1.52618 341.38 1.54799 341.729 1.58287L341.184 1.53054C341.534 1.56543 341.869 1.61339 342.191 1.67008L341.59 1.34304C341.478 1.43897 341.366 1.5349 341.226 1.62647L341.436 1.4913C341.226 1.62647 340.989 1.74857 340.667 1.86194L341.045 1.73112C340.863 1.79217 340.681 1.84886 340.471 1.89682L341.003 1.77473C340.933 1.79217 340.863 1.80525 340.779 1.81833C340.499 1.87502 341.296 1.73985 341.24 1.74857C341.17 1.75729 341.1 1.76601 341.031 1.77473C340.989 1.77909 341.967 1.6788 341.548 1.71804C341.296 1.73985 341.003 1.71804 342.079 1.68752C342.023 1.68752 341.953 1.69188 341.897 1.69624C341.59 1.70932 342.75 1.69624 342.372 1.68752C342.302 1.68752 342.219 1.68752 342.149 1.68752L342.806 1.70932C342.638 1.70496 342.47 1.69188 342.302 1.6788L342.848 1.73549C342.666 1.71368 342.498 1.69188 342.33 1.657L342.722 1.74421C342.526 1.7006 342.358 1.64828 342.233 1.58287L342.442 1.69624C342.302 1.61775 342.233 1.53054 342.233 1.43897V1.56979C342.233 1.47822 342.316 1.39101 342.442 1.30816L342.233 1.44333C342.33 1.38665 342.442 1.33432 342.568 1.28636L342.191 1.41717C342.275 1.39101 342.344 1.36921 342.442 1.3474L341.911 1.4695C341.911 1.4695 342.023 1.44769 342.079 1.43461C341.506 1.52182 341.338 1.54799 341.59 1.5131C341.757 1.4913 341.674 1.50002 341.324 1.53926C340.975 1.57415 340.891 1.58287 341.058 1.56979C340.374 1.60467 340.164 1.61775 340.43 1.60903C340.667 1.60031 340.471 1.60467 339.856 1.61775C339.898 1.61775 339.954 1.61775 339.996 1.61775L339.339 1.59595C339.451 1.60031 339.563 1.60903 339.675 1.61775L339.13 1.56107C339.283 1.57851 339.423 1.60031 339.549 1.63083L339.158 1.54362C339.409 1.60031 339.605 1.67008 339.759 1.75293L339.549 1.63956C339.703 1.73112 339.801 1.82706 339.801 1.92735V1.79653C339.801 1.87066 339.745 1.94915 339.703 2.01892C339.507 2.37211 341.059 2.42008 341.827 2.407C343.099 2.38519 344.427 2.23694 345.252 1.92299C345.741 1.73985 345.853 1.47386 345.615 1.25147C345.377 1.02909 344.86 0.850311 344.203 0.723858C343.868 0.658451 343.477 0.619206 343.099 0.597404C342.177 0.540718 341.254 0.571241 340.346 0.636648C339.06 0.728218 337.886 0.941881 337.047 1.25583C336.208 1.56979 336.013 2.09304 337.047 2.39828C337.634 2.57269 338.445 2.67735 339.227 2.70787C340.681 2.76456 342.107 2.69915 343.463 2.52909C344.623 2.38083 345.643 2.13665 346.398 1.82269C346.901 1.61339 347.236 1.36485 347.502 1.12066C347.656 0.972404 347.25 0.854672 346.901 0.793625C345.685 0.575602 344.175 0.484032 342.778 0.501474C341.799 0.514555 340.835 0.549439 339.884 0.645369C338.766 0.758741 337.648 0.898276 336.754 1.14246C336.111 1.31688 335.635 1.55671 335.775 1.83142C335.845 1.97531 336.194 2.11485 336.572 2.20642C338.417 2.64246 341.17 2.50293 343.015 2.14101C343.756 1.99711 344.413 1.80525 344.874 1.57851C345.238 1.39537 345.517 1.19479 345.769 0.994206C345.951 0.854672 345.503 0.719497 345.168 0.662811C344.623 0.575602 343.798 0.571241 343.225 0.597404C341.953 0.65409 340.388 0.819788 339.87 1.22531L339.842 1.21659Z"
                  fill="#D1F225"
                />
                <path
                  d="M365.672 2.11046H386.359C393.25 2.11046 400.238 2.21512 407.115 2.0843C408.121 2.06686 409.91 1.87064 410.288 1.53924C410.665 1.20785 409.519 1.09448 408.624 1.07703C401.915 0.941859 395.039 1.06395 388.316 1.06395H367.979C366.721 1.06395 364.764 1.19041 364.079 1.56541C363.394 1.94041 364.652 2.1061 365.686 2.1061L365.672 2.11046Z"
                  fill="#D1F225"
                />
                <path
                  d="M428.584 1.13375C428.486 1.15555 428.374 1.17299 428.262 1.19479L428.919 1.09014C428.766 1.1163 428.598 1.13375 428.43 1.15555L429.199 1.0727C429.059 1.08578 428.905 1.09886 428.766 1.10758L429.562 1.05962C429.409 1.06834 429.269 1.0727 429.115 1.07706L429.856 1.06398C429.674 1.06398 429.506 1.06398 429.325 1.06398L429.982 1.08578H429.912L431.044 1.46078C431.114 1.39973 431.184 1.33433 431.268 1.27764L431.072 1.41282C431.212 1.32125 431.379 1.23404 431.603 1.15555L431.226 1.28636C431.351 1.24276 431.491 1.20351 431.631 1.17299L431.1 1.29508C431.184 1.27764 431.268 1.2602 431.351 1.24712L430.695 1.35177C430.778 1.33869 430.848 1.32997 430.932 1.32125L430.163 1.40409C430.163 1.40409 430.289 1.39101 430.359 1.38665L429.562 1.43462C429.646 1.43026 429.73 1.4259 429.814 1.4259L429.073 1.43898C429.171 1.43898 429.269 1.43898 429.367 1.43898L428.71 1.41718C428.864 1.42154 429.003 1.43026 429.143 1.4477L428.612 1.39537C428.864 1.42154 429.087 1.45642 429.297 1.50439L428.905 1.42154C429.227 1.49566 429.506 1.58287 429.716 1.69189L429.506 1.57851C429.688 1.6788 429.8 1.78782 429.814 1.90555V1.77473C429.814 1.85322 429.758 1.93171 429.66 2.00584L429.856 1.87066C429.772 1.92735 429.66 1.97968 429.52 2.02328L429.898 1.89247C429.8 1.92735 429.688 1.95351 429.576 1.97968L430.107 1.85758C430.01 1.87939 429.898 1.90119 429.786 1.91863L430.443 1.81398C430.345 1.82706 430.247 1.84014 430.135 1.85322L430.904 1.77037C430.806 1.77909 430.695 1.78782 430.583 1.79654L431.379 1.74857C431.268 1.75293 431.17 1.75729 431.058 1.76165L431.799 1.74857C431.659 1.74857 431.505 1.74857 431.365 1.74857L432.022 1.77037C431.883 1.76601 431.743 1.75729 431.603 1.73985L432.148 1.79654C431.952 1.77473 431.785 1.74857 431.617 1.71369L432.008 1.8009C431.785 1.74857 431.603 1.68753 431.463 1.6134L431.673 1.72677C431.477 1.61776 431.379 1.49566 431.379 1.36921V1.50003C431.379 1.39101 431.449 1.28636 431.603 1.18607L431.393 1.32125C431.491 1.2602 431.603 1.20351 431.743 1.15119L431.365 1.282C431.449 1.25148 431.547 1.22532 431.645 1.20351L431.114 1.32561C431.184 1.30816 431.268 1.29508 431.351 1.282L430.681 1.38665C430.764 1.37357 430.848 1.36485 430.932 1.35177L430.163 1.43462C430.247 1.4259 430.331 1.41718 430.429 1.41282L429.632 1.46078C429.716 1.45642 429.814 1.45206 429.898 1.45206L429.157 1.46514C429.283 1.46514 429.409 1.46514 429.534 1.46514L428.877 1.44334C429.045 1.4477 429.199 1.46078 429.353 1.47822L428.808 1.42154C429.031 1.4477 429.241 1.47822 429.437 1.52183L429.045 1.43462C429.297 1.4913 429.506 1.56107 429.674 1.64392L429.465 1.53055C429.562 1.58723 429.632 1.64392 429.674 1.70497L430.261 1.30816C429.982 1.39537 429.674 1.47386 429.353 1.54799L429.884 1.4259C429.506 1.51311 429.101 1.58723 428.682 1.65264L429.353 1.54799C428.975 1.60468 428.598 1.657 428.193 1.70061L428.947 1.62212C428.598 1.657 428.262 1.69625 427.913 1.73113L428.654 1.65264C428.542 1.66572 428.416 1.6788 428.304 1.68752C427.675 1.74421 426.907 1.83578 426.431 1.98404C426.138 2.07125 425.872 2.16718 425.872 2.30235C425.844 2.34596 425.872 2.3852 425.97 2.42008C426.054 2.48549 426.222 2.52909 426.445 2.55526C427.019 2.63375 427.689 2.64247 428.304 2.6163C430.107 2.53346 431.925 2.33723 433.434 2.00584C433.811 1.92299 434.203 1.83578 434.552 1.73985C435.055 1.60468 435.726 1.43898 435.573 1.20787C435.531 1.15119 435.461 1.0945 435.363 1.04218C435.195 0.950606 435.027 0.859037 434.776 0.784909C433.392 0.379385 431.324 0.370665 429.576 0.497118C427.829 0.623572 426.054 0.968048 425.565 1.52619C425.425 1.68316 425.425 1.87066 425.537 2.02764C425.579 2.08869 425.649 2.14537 425.747 2.20206C425.9 2.29363 426.068 2.3852 426.306 2.45497C427.648 2.86485 429.814 2.83433 431.491 2.70787C433.168 2.58142 435.055 2.25439 435.601 1.70933C435.908 1.39973 435.489 1.05962 434.818 0.828513C433.714 0.457874 431.897 0.340141 430.345 0.427351C428.975 0.501479 427.55 0.654095 426.557 0.976769C426.236 1.08142 425.928 1.19043 425.705 1.32125C425.509 1.44334 425.313 1.56543 425.188 1.69625C424.978 1.90555 425.761 2.0538 426.32 2.07561C426.739 2.08869 427.144 2.11049 427.564 2.10613C428.304 2.09741 428.919 2.07561 429.646 2.02328C430.541 1.96223 431.449 1.8445 432.218 1.69189C432.637 1.60904 433.224 1.4695 433.336 1.3038C433.434 1.15991 433.155 1.03346 432.735 0.976769C432.148 0.89392 431.435 0.885199 430.792 0.911362C430.024 0.946246 429.227 1.01165 428.57 1.14683L428.584 1.13375Z"
                  fill="#D1F225"
                />
                <path
                  d="M452.779 2.03196C467.483 1.85754 482.215 1.90551 496.905 2.18458C498.149 2.20638 500.133 2.04068 500.804 1.67876C501.503 1.2994 500.203 1.15551 499.197 1.13807C484.507 0.858996 469.775 0.80667 455.071 0.985449C453.799 1.00289 451.884 1.10318 451.171 1.49126C450.514 1.84882 451.73 2.04504 452.779 2.03196Z"
                  fill="#D1F225"
                />
              </g>
              <defs>
                <clipPath id="clip0_322_1065">
                  <rect width="501" height="3" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresList.map((feature, index) => (
              <Card key={index} className="p-9">
                <div className="space-y-9">
                  <feature.icon className="w-[60px] h-[60px] text-primary" strokeWidth={1} />
                  <div className="space-y-2">
                    <h3 className={cn(manrope.className, "text-white text-2xl font-semibold")}>
                      {feature.title}
                    </h3>
                    <p className="text-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
