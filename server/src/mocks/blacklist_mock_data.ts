import {Blacklist} from '../auth/interfaces/blacklist'
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwic3ViIjoiNWU0YmI1OTQ4ZDMyNjRiZjFmNmEzY2Q2IiwiaWF0IjoxNTgyMTAyMjg0LCJleHAiOjE1ODIxMDQwODR9.QARlbqRaOAIQVcpsGZsUgfKds0EMp7gFE2aW453cCUM'
const blacklistMockData: Blacklist = {createdAt: new Date(), jwt: jwt};
export {blacklistMockData, jwt}
