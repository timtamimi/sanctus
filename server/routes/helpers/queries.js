export default {
    averageAttendanceRateQuery: `SELECT (SUM(CASE WHEN attended=1 THEN 1 ELSE 0 END)*1.0)/(COUNT(*)) as "averageAttendanceRate" FROM "Sessions"`,
    topPartnersByUsageQuery: (order = desc, limit = 10) => `SELECT 
        "Partners".name,
        "Partners"."expectedMonthlyUsage" as estimated,
        COUNT("Sessions".id) as actual,
        (COUNT("Sessions".id)*1.0)/"Partners"."expectedMonthlyUsage" as ratio 
        FROM "Partners" 
        JOIN "Coachees" ON "Coachees"."PartnerId" = "Partners".id
        JOIN "Sessions" ON "Coachees"."id" = "Sessions".CoacheeId
        GROUP BY "Coachees"."PartnerId"
        ORDER BY ratio ${order}
        LIMIT ${limit}`,
    coachUtilisationBypartner: `SELECT 
        CONCAT("Partners".id, '::', "Sessions".CoachEmail) as "id",
        "Partners".name,
        "Sessions"."CoachEmail",
        (SELECT COUNT(*) FROM "Sessions" s2
         JOIN "Coachees" c2 on c2.id = s2."CoacheeId" 
         and c2."PartnerId" = "Partners".id
         and s2."CoachEmail" = "Sessions"."CoachEmail") as "countOfSessionsDelivered",
        "Partners"."expectedMonthlyUsage" as "expectedMonthlyUsage"
        FROM "Partners" 
        JOIN "Coachees" ON "Coachees"."PartnerId" = "Partners".id
        JOIN "Sessions" ON "Coachees"."id" = "Sessions".CoacheeId
        GROUP BY "Coachees"."PartnerId", "Sessions"."CoachEmail"
        ORDER BY "countOfSessionsDelivered"/"expectedMonthlyUsage" desc`
}
