import socket
import threading
import logging
import random
import time

# Set up logging
logging.basicConfig(level=logging.INFO)

def handle_client(conn, addr):
    logging.info(f"Connected by {addr}")
    try:
        while True:
            # Generate a random number
            num = random.randint(1, 100)

            # Send data
            conn.sendall(str(num).encode())

            logging.info(f"Sent: {num}")

            time.sleep(2)  # pause for 2 seconds

    finally:
        # Clean up the connection
        conn.close()
        logging.info(f"Connection to {addr} closed")

def start_server(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('0.0.0.0', port))
        s.listen()
        logging.info(f"Server listening on localhost:{port}")
        while True:
            conn, addr = s.accept()
            thread = threading.Thread(target=handle_client, args=(conn, addr))
            thread.start()

if __name__ == "__main__":
    # Start two servers in separate threads
    threading.Thread(target=start_server, args=(4146,)).start()
    threading.Thread(target=start_server, args=(4147,)).start()