# Image metadata and config.
ARG VARIANT="14-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

COPY .zshrc /home/vscode/.zshrc
COPY .zshrc /root/.zshrc

LABEL name="Angular dev environment" \
      description="This image can be used to create a dev environment for building Angular." \
      vendor="angular" \
      version="12"

EXPOSE  4200


# Configure `Node.js`/`npm` and install utilities.
#RUN npm config --global set user root
#RUN npm install --global yarn@latest
RUN npm install --global npm@latest
# Ideally, the version should be what we use on CI.
RUN npm install -g @angular/cli@9.0.7

# Go! (And keep going.)
CMD ["tail", "--follow", "/dev/null"]


