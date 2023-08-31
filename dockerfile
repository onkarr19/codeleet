# Use a specific version of the GCC image as the base image
FROM gcc:10

# Set a working directory within the container
WORKDIR /app

# Copy the submission source code into the container
COPY submission.cpp /app

# Compile the submission code
RUN g++ -o submission submission.cpp

# Run the compiled submission as the container's entry point
CMD ["./submission"]
