FROM mysql:8.3.0

# Copy initialization scripts
COPY init-scripts/ /docker-entrypoint-initdb.d/

# Set default authentication plugin
CMD ["--default-authentication-plugin=caching_sha2_password"] 