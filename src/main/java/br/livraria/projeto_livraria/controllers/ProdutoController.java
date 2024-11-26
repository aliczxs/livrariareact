package br.livraria.projeto_livraria.controllers;

import br.livraria.projeto_livraria.model.Produto;
import br.livraria.projeto_livraria.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    // Endpoint para listar todos os produtos
    @GetMapping("/produtos")
    public List<Produto> getAllProdutos() {
        return produtoRepository.findAll();
    }

    // Endpoint para atualizar um produto
    @PutMapping("/produtos/{id}")
    public Produto atualizarProduto(@PathVariable String id, @RequestBody Produto produtoAtualizado) {
        // Log para depuração - Verificar os dados recebidos no produto
        System.out.println("Produto a ser atualizado: ");
        System.out.println("ID: " + id);
        System.out.println("Comentário: " + produtoAtualizado.getComentario());
        
        // Busca o produto existente no banco de dados
        Optional<Produto> produtoExistente = produtoRepository.findById(id);

        if (produtoExistente.isPresent()) {
            Produto produto = produtoExistente.get();

            // Atualizando os campos
            produto.setTitulo(produtoAtualizado.getTitulo());
            produto.setAutor(produtoAtualizado.getAutor());
            produto.setPreco(produtoAtualizado.getPreco());
            produto.setCategoria(produtoAtualizado.getCategoria());
            produto.setDescricao(produtoAtualizado.getDescricao());
            produto.setEstoque(produtoAtualizado.getEstoque());
            
            // Atualizando o comentário e a imagem
            produto.setComentario(produtoAtualizado.getComentario()); // Atualiza o comentário
            produto.setImagemUrl(produtoAtualizado.getImagemUrl()); // Atualiza a imagem

            // Salva as alterações no banco e retorna o produto atualizado
            Produto produtoSalvo = produtoRepository.save(produto);
            
            // Log para depuração - Confirmar os dados após a atualização
            System.out.println("Produto atualizado: ");
            System.out.println("ID: " + produtoSalvo.getId());
            System.out.println("Comentário: " + produtoSalvo.getComentario());

            return produtoSalvo; // Retorna o produto atualizado
        } else {
            // Caso o produto não seja encontrado, lança uma exceção
            throw new RuntimeException("Produto com ID " + id + " não encontrado.");
        }
    }
}
