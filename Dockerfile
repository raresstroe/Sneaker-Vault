# Use PHP 8.2 FPM base image
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring

# Install Node.js and npm (if needed)
# RUN apt-get install -y nodejs npm

# Set working directory
WORKDIR /app

# Copy and install PHP dependencies
COPY composer.json composer.lock ./
RUN composer install --no-scripts

# Copy and install Node.js dependencies (if needed)
# COPY package.json yarn.lock* ./
# RUN npm install

# Copy the rest of the application code
COPY . .

# Run PHP artisan serve or your preferred command
CMD php artisan serve --host=0.0.0.0 --port=80
