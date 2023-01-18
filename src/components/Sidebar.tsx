import { gql, useQuery } from "@apollo/client";
import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";


const GET_LESSON_QUERY = gql`
query GetLessons {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
        id
        lessonType
        availableAt
        title
        slug
    }
} 
`

interface GetLessonsResponse {
    lesson: {
        title   : string;
        id: string;
        lessonType: string;
        availableAt: Date;        
        slug:   string;
    }
}    


export function Sidebar() {
    const { data, loading, error } = useGetLessonsQuery();   

    return(
        <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
            <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block ">
                Cronograma de aulas
            </span>
            <div className="flex flex-col gap-8">                                            
                  {data?.lessons.map(lesson => {
                        return(
                            <Lesson
                                key={lesson.id}
                                title={lesson.title}
                                slug={lesson.slug}
                                availableAt={new Date(lesson.availableAt)}
                                type={lesson.lessonType}
                             />
                        )
                  })}
            </div>
        </aside>
    )
}