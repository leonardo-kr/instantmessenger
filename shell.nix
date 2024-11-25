let
  nixpkgs = builtins.fetchTarball {
        url = "https://github.com/NixOS/nixpkgs/archive/nixos-24.05.tar.gz";
        sha256 = "1n6gdjny8k5rwkxh6sp1iwg1y3ni1pm7lvh9sisifgjb18jdvzbm";
    };

    pkgs = import nixpkgs { config = {}; };
in 
   pkgs.stdenv.mkDerivation {
        name = "instant messenger nix env";
        nativeBuildInputs = with pkgs; [
             nodejs_22
        ];
    } 
