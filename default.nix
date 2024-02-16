{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  name = "shell";
  buildInputs = with pkgs; [
    nodejs_20
  ];
}

