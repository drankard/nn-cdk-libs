FROM node:lts-bullseye


RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    curl \
    build-essential \
    apt-utils make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev vim jq


# cdk and deps
RUN npm install -g npm@latest aws-cdk@latest @aws-amplify/cli typescript@latest ts-node@latest jest@latest ts-jest@latest @types/node@latest @types/jest@latest @aws-cdk/cloud-assembly-schema@latest @aws-cdk/cx-api@latest @aws-cdk/region-info@latest constructs@latest @aws-cdk/core@latest @aws-cdk/assert@latest projen @aws-cdk/assert@latest

# Pipeline Agent
RUN curl -s "https://packages.microsoft.com/config/debian/10/packages-microsoft-prod.deb" -o "/tmp/packages-microsoft-prod.deb"
RUN dpkg -i /tmp/packages-microsoft-prod.deb
RUN curl -s "https://vstsagentpackage.azureedge.net/agent/2.195.0/vsts-agent-linux-x64-2.195.0.tar.gz" -o "/tmp/vsts-agent-linux-x64-2.195.0.tar.gz"

RUN cd /tmp
RUN curl -s "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

# Create and switch to agemt user
RUN useradd -ms /bin/bash agent
WORKDIR /home/agent
USER agent


# Install pyenv and source

RUN curl -s https://pyenv.run | bash

ENV PATH=/home/agent/.pyenv/bin:/home/agent/.pyenv/shims:$PATH
# RUN echo export PATH="\$HOME/.pyenv:\$PATH" >> .profile

RUN pyenv install 3.9.5
RUN pyenv global 3.9.5
RUN pip install --upgrade pip

# # # Install Poetry and source
RUN curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python
ENV PATH="/home/agent/.poetry/bin:$PATH"
# RUN echo export PATH="\$HOME/.poetry/bin:\$PATH" >> .profile

RUN poetry --version
RUN cat .profile

RUN tar zxvf /tmp/vsts-agent-linux-x64-2.195.0.tar.gz

# Debug npm
RUN npm list -g --depth 0

COPY docker_entrypoint.sh .
ENTRYPOINT bash docker_entrypoint.sh
