openapi: 3.0.0
info:
  title: SanctusCodeTest API
  description: SanctusCodeTest API
  version: '1'
paths:
  /partners:
    get:
      tags:
        - Partners
      summary: Get partners
      responses:
        '200':
          description: Partners
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: string
                    name:
                      type: string
                    sessionCount:
                      type: number
                    delta:
                      type: number
        '500':
          $ref: '#/components/responses/Problem'
  /coachees:
    get:
      tags:
        - Coachees
      summary: Get coachees
      responses:
        '200':
          description: Coachees
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: string
                    firstName:
                      type: string
                    lastName:
                      type: number
        '500':
          $ref: '#/components/responses/Problem'
  /coaches:
    get:
      tags:
        - Coaches
      summary: Get coaches
      responses:
        '200':
          description: Coaches
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    email:
                      type: string
        '500':
          $ref: '#/components/responses/Problem'
  /sessions:
    get:
      tags:
        - Sessions
      summary: Get sessions
      responses:
        '200':
          description: Sessions
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    CoachEmail:
                      type: string
                    CoacheeId:
                      type: string
                    sessionStart:
                      type: string
                    attended:
                      type: boolean
        '500':
          $ref: '#/components/responses/Problem'
  /custom/key-stats:
    get:
      tags:
        - Sessions
      summary: Get key stats
      responses:
        '200':
          description: Key stats (custom reporting)
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    averageAttendanceRate:
                      type: number
                    topOverUsingPartners:
                      type: array
                      items:
                        type: object
                        properties:
                          name:
                            type: string
                          actual:
                            type: number
                          expectedMonthlyUsage:
                            type: number
                    topUnderUsingPartners:
                      type: array
                      items:
                        type: object
                        properties:
                          name:
                            type: string
                          actual:
                            type: number
                          expectedMonthlyUsage:
                            type: number
                    coachesByPartner:
                      type: array
                      items:
                        type: object
                        properties:
                          name:
                            type: string
                          email:
                            type: string
                          countOfSessionsDelivered:
                            type: number
                          expectedMonthlyUsage:
                            type: number
                    sessionStart:
                      type: string
                    attended:
                      type: boolean
        '500':
          $ref: '#/components/responses/Problem'
components:
  responses:
    Problem:
      description: Error
      content:
        application/json:
          schema:
            type: object
            additionalProperties: true
            minProperties: 1
            properties:
              message:
                type: string
                description: A short description of the error
              detail:
                type: object
                description: Additional details that will be useful in diagnosing the source of the problem
