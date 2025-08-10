from dotenv import load_dotenv
import subprocess
import time
import os

load_dotenv()

house_address = os.getenv('HOUSE')
package_id = os.getenv('PACKAGE')

interval = int(input('Call frequency? (in minutes, default 60) : '))
while True:
    subprocess.call(['sui', 'client', 'call', '--function', 'globalTimedTasks', '--args', house_address, '0x6', '--module', 'bidding', '--package', package_id])
    print(f'last executed at : {time.strftime('%m/%d/%Y, %H:%M:%S', time.localtime())} with {interval} minute interval')
    time.sleep(interval * 60)