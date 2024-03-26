import socketserver
import threading
import logging
import random
import time

# Set up logging
logging.basicConfig(level=logging.INFO)

class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass

class Handler(socketserver.BaseRequestHandler):
    def handle(self):
        logging.info(f"Connected by {self.client_address}")
        try:
            while True:
                # Generate a random number
                num = random.randint(1, 100)

                # Send data
                self.request.sendall(str(num).encode())

                logging.info(f"Sent: {num}")

                time.sleep(2)  # pause for 2 seconds

        finally:
            # Clean up the connection
            logging.info(f"Connection to {self.client_address} closed")

def start_server(port):
    with ThreadedTCPServer(('0.0.0.0', port), Handler) as server:
        logging.info(f"Server listening on localhost:{port}")
        server.serve_forever()

if __name__ == "__main__":
    # Start two servers in separate threads
    threading.Thread(target=start_server, args=(4146,)).start()
    threading.Thread(target=start_server, args=(4147,)).start()