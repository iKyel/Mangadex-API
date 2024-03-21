import http.client
import json

def authenticate():
    username = 'fukuyagi'
    password = 'kien20052003'
    client_id = 'personal-client-3bf8acb2-3a8b-4606-8e57-6aa12eb6aa75-7c2951c9'
    client_secret = 'odJZX4UtDjBwfFcZahzwe9hlBBhP3HA4'
    
    conn = http.client.HTTPSConnection("auth.mangadex.org")
    
    payload = f"grant_type=password&username={username}&password={password}&client_id={client_id}&client_secret={client_secret}"
    
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'MyApp/1.0'  # Set an appropriate User-Agent header
    }
    
    conn.request("POST", "/realms/mangadex/protocol/openid-connect/token", payload, headers)
    
    res = conn.getresponse()
    data = res.read().decode('utf-8')  # Decode response data to UTF-8
    
    if res.status != 200:
        raise Exception(f'Failed to authenticate. Status code: {res.status}. Response data: {data}')
    
    try:
        response_data = json.loads(data)
        access_token = response_data['access_token']
        refresh_token = response_data['refresh_token']
        return access_token, refresh_token
    except json.JSONDecodeError:
        raise Exception(f'Failed to parse JSON response: {data}')

# Usage example:
try:
    access_token, refresh_token = authenticate()
    print('Access Token:', access_token)
    print('Refresh Token:', refresh_token)
except Exception as e:
    print('Authentication failed:', str(e))
