let
  nixpkgs = builtins.fetchTarball {
        url = "https://github.com/NixOS/nixpkgs/archive/nixos-24.05.tar.gz";
        sha256 = "0gm7f4nlk49v256ci8dxkggfidn09434piljhq8mphi6x1n91hqr";
    };

    pkgs = import nixpkgs { config = {}; };
in 
   pkgs.stdenv.mkDerivation {
        name = "instant messenger nix env";
        nativeBuildInputs = with pkgs; [
             nodejs_22
        ];
    } 
