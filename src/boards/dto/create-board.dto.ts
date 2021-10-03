import { IsNotEmpty } from 'class-validator';

// 인터페이스와 다르게 런타임에서 작동하므로 파이프와 같은 기능을 이용할 떄 유용하다.
export class CreateBoardDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}
