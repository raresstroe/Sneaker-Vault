FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring

# Verify Node.js and npm versions
RUN node -v
RUN npm -v

WORKDIR /app
COPY composer.json .
RUN composer install --no-scripts

COPY package.json package-lock.json ./
RUN npm set timeout=60000 && npm install

COPY . .

CMD php artisan serve --host=0.0.0.0 --port=80
