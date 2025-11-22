// lib/ip-utils.ts
import { headers } from 'next/headers';

/**
 * Get client IP address from request headers
 */
export async function getClientIP(){
  const headersList = await headers();
  
  // Try different headers in order of preference
  const possibleHeaders = [
    'x-forwarded-for',
    'x-real-ip',
    'x-client-ip',
    'cf-connecting-ip', // Cloudflare
    'x-forwarded',
    'forwarded-for',
    'forwarded'
  ];

  for (const header of possibleHeaders) {
    const value = headersList.get(header);
    if (value) {
      // x-forwarded-for can contain multiple IPs, take the first one
      const ip = value.split(',')[0].trim();
      if (ip && ip !== '::1' && ip !== '127.0.0.1') {
        return ip;
      }
    }
  }

  return null;
}

/**
 * Get country from IP address using a free geolocation service
 */
export async function getCountryFromIP(ip: string): Promise<string | null> {
  try {
    // Using ip-api.com (free, no API key required)
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MyApp/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.country || null;
  } catch (error) {
    console.error('Error fetching country from IP:', error);
    
    // Fallback to ipapi.co if ip-api.com fails
    try {
      const fallbackResponse = await fetch(`https://ipapi.co/${ip}/country_name/`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; MyApp/1.0)',
        },
      });
      
      if (fallbackResponse.ok) {
        const country = await fallbackResponse.text();
        return country.trim() || null;
      }
    } catch (fallbackError) {
      console.error('Fallback IP geolocation also failed:', fallbackError);
    }
    
    return null;
  }
}

/**
 * Get client country (combines IP detection and geolocation)
 */
export async function getClientCountry(): Promise<string | null> {
  const ip = await getClientIP();
  
  if (!ip) {
    console.log('Could not determine client IP');
    return null;
  }

  console.log('Client IP:', ip);
  
  const country = await getCountryFromIP(ip);
  console.log('Detected country:', country);
  
  return country;
}
